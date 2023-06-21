

const Highlights = ({highlights}) => {
  return (
    <div className="flex justify-center">
      <ul className='list-disc w-[90%] text-[14px]'>
          {highlights.map((highlight, i) => (
              <li key={'highlights_'+i}>
                {highlight.highlight}
              </li>
          ))}
      </ul>
    </div>
  )
}

export default Highlights