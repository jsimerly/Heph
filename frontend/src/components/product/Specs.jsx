
const Specs = ({specs}) => {
  return (
    <div className="flex w-full bg-neutralOffWhite mx-1 p-2 sm:p-6 justify-around rounded-md">
      <table className="w-full  border border-white rounded-md ">
        <tbody>
          {specs.map((spec, i) => {
            console.log(spec)
            return(
              <tr 
                className={`${i%2 == 0 ? 'bg-white' : 'bg-neutralOffWhite'}`}
                key={'specs_table_row'+i}
              >
                <td className="border-r">{spec.spec_name}</td>
                <td className="w-2/3 pl-3">{spec.spec_info}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Specs