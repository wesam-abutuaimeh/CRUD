const STORES_COLUMNS = (data, handleEdit, handleDelete) => [
  {
    key: "id",
    title: "Store Id",
  },
  {
    key: "name",
    title: "Store Name",
  },
  {
    key: "address",
    title: "Store Address",
    render: (data) => `{ ${data.cities.join(" },{ ")} }`,
  },
  {
    key: "actions",
    title: "Actions",
    render: (data) => (
      <div onClick={(e) => e.stopPropagation()}>
        <button
          style={{
            backgroundColor: "#c0392b",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            margin: "0 5px",
          }}
          onClick={() => handleEdit(data.id)}
        >
          Edit
        </button>
        <button
          style={{
            backgroundColor: "#2ecc71",
            color: "white",
            padding: "10px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            margin: "0 5px",
          }}
          onClick={() => handleDelete(data.id)}
        >
          Delete
        </button>
      </div>
    ),
  },
];

export default STORES_COLUMNS;
