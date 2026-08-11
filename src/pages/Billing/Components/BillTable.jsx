export function BillTable({ filtered, statusMeta, openExisting }) {
  return (
    <div className="table-wrapper">
      <table className="billing-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Total Purchased</th>
            <th>Total Due</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={8} className="empty-row">
                No bills found.
              </td>
            </tr>
          ) : (
            filtered.map((c, i) => (
              <tr
                key={c.id}
                className="table-row"
                onClick={() => openExisting(c)}
              >
                <td>{i + 1}</td>
                <td className="name-cell">{c.name}</td>
                <td>{c.phone}</td>
                <td>Rs {c.totalPurchased.toLocaleString()}</td>
                <td>Rs {c.totalDue.toLocaleString()}</td>
                <td>{c.date}</td>
                <td>
                  <span className={`status-badge ${statusMeta[c.status].cls}`}>
                    {statusMeta[c.status].label}
                  </span>
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <div className="action-btns">
                    <button
                      className="action-btn"
                      title="View"
                      onClick={() => openExisting(c)}
                    >
                      View
                    </button>
                    <button
                      className="action-btn action-btn-danger"
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
