export default function Table({
  columns,
  children
}) {

  return (

    <div
      className="
        bg-white
        rounded-xl
        shadow
        overflow-hidden
      "
    >

      <table className="w-full">

        <thead>

          <tr className="bg-gray-100">

            {columns.map(column => (

              <th
                key={column}
                className="p-4 text-left"
              >
                {column}
              </th>

            ))}

          </tr>

        </thead>

        <tbody>

          {children}

        </tbody>

      </table>

    </div>

  );

}