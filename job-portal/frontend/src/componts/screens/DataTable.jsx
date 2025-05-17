
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const DataTable = ({ data, columns }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped table-bordered align-middle">
        <thead className="table-light">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="fw-semibold text-center">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={item.id || i} className="text-center">
              {columns.map((col, j) => (
                <td key={j}>{col.render(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
