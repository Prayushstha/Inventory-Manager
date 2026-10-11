import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

export const DEFAULT_PAYMENT_METHOD = "Cash";
export const PAYMENT_METHODS = ["Cash", "UPI", "Card", "Credit"];

export function defaultInvoiceDefaults() {
  return {
    shopName: "",
    shopAddress: "",
    shopTelephone: "",
    invoiceNumber: "",
    tpinNumber: "",
  };
}

export function defaultAppConfig() {
  return {
    defaultPaymentMethod: DEFAULT_PAYMENT_METHOD,
    dataDirectory: null,
    invoiceDefaults: defaultInvoiceDefaults(),
  };
}

function validateAppConfig(config) {
  if (!config || typeof config !== "object" || Array.isArray(config)) {
    throw new Error("Application settings must be a JSON object.");
  }

  const defaultPaymentMethod = config.defaultPaymentMethod ?? DEFAULT_PAYMENT_METHOD;
  if (!PAYMENT_METHODS.includes(defaultPaymentMethod)) {
    throw new Error("Default payment method must be Cash, UPI, Card, or Credit.");
  }

  const dataDirectory = config.dataDirectory ?? null;
  if (
    dataDirectory !== null &&
    (typeof dataDirectory !== "string" || !path.isAbsolute(dataDirectory))
  ) {
    throw new Error("The configured data directory must be an absolute path.");
  }

  const invoiceDefaults = config.invoiceDefaults ?? defaultInvoiceDefaults();
  if (!invoiceDefaults || typeof invoiceDefaults !== "object" || Array.isArray(invoiceDefaults)) {
    throw new Error("Invoice defaults must be a JSON object.");
  }

  const defaults = defaultInvoiceDefaults();
  for (const key of Object.keys(defaults)) {
    const value = invoiceDefaults[key] ?? "";
    if (typeof value !== "string") {
      throw new Error(`Invoice default "${key}" must be text.`);
    }
    defaults[key] = value.trim();
  }

  return { defaultPaymentMethod, dataDirectory, invoiceDefaults: defaults };
}

export function loadAppConfig(configPath) {
  if (!fs.existsSync(configPath)) return defaultAppConfig();

  let contents;
  try {
    contents = JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch (error) {
    throw new Error(`Could not read application settings at "${configPath}".`, { cause: error });
  }
  return validateAppConfig(contents);
}

export function saveAppConfig(configPath, config) {
  const validatedConfig = validateAppConfig(config);
  const directory = path.dirname(configPath);
  fs.mkdirSync(directory, { recursive: true });
  const temporaryPath = path.join(directory, `.settings-${randomUUID()}.tmp`);

  try {
    fs.writeFileSync(temporaryPath, `${JSON.stringify(validatedConfig, null, 2)}\n`, {
      encoding: "utf8",
      flag: "wx",
    });
    fs.renameSync(temporaryPath, configPath);
  } catch (error) {
    fs.rmSync(temporaryPath, { force: true });
    throw new Error(`Could not save application settings at "${configPath}".`, { cause: error });
  }

  return validatedConfig;
}

export function resolveDataDirectory({ config, isPackaged, userDataPath, developmentPath }) {
  const validatedConfig = validateAppConfig(config);
  return path.resolve(
    validatedConfig.dataDirectory ||
      (isPackaged ? userDataPath : developmentPath),
  );
}

export async function copyDatabaseToDirectory(db, sourceDirectory, targetDirectory) {
  const source = path.resolve(sourceDirectory);
  const target = path.resolve(targetDirectory);
  if (source === target) {
    throw new Error("Choose a different folder from the current data directory.");
  }

  fs.mkdirSync(target, { recursive: true });
  if (fs.readdirSync(target).length > 0) {
    throw new Error("Choose an empty folder for the StockWise data copy.");
  }

  const stagingDirectory = fs.mkdtempSync(path.join(target, ".stockwise-setup-"));
  const databaseFilename = path.basename(db.name || "inventory.db");
  const stagedDatabasePath = path.join(stagingDirectory, databaseFilename);
  const stagedImagesPath = path.join(stagingDirectory, "images");
  const createdPaths = [];

  try {
    await db.backup(stagedDatabasePath);
    const sourceImagesPath = path.join(source, "images");
    if (fs.existsSync(sourceImagesPath)) {
      fs.cpSync(sourceImagesPath, stagedImagesPath, { recursive: true, errorOnExist: true });
    }

    const targetDatabasePath = path.join(target, databaseFilename);
    fs.renameSync(stagedDatabasePath, targetDatabasePath);
    createdPaths.push(targetDatabasePath);
    if (fs.existsSync(stagedImagesPath)) {
      const targetImagesPath = path.join(target, "images");
      fs.renameSync(stagedImagesPath, targetImagesPath);
      createdPaths.push(targetImagesPath);
    }
  } catch (error) {
    for (const createdPath of createdPaths) {
      fs.rmSync(createdPath, { recursive: true, force: true });
    }
    throw new Error(`Could not copy StockWise data to "${target}".`, { cause: error });
  } finally {
    fs.rmSync(stagingDirectory, { recursive: true, force: true });
  }

  return target;
}
