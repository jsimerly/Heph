
const StandardDetails = ({desc}) => {
  return (
    <p className="px-6 pb-4 text-[16px] tracking-wide">
      {desc.split('\n').map((paragraph, i) => {
        return <span key={'paragraph_'+i}>{paragraph}<br/></span>
      })}
    </p>
  )
}

export default StandardDetails