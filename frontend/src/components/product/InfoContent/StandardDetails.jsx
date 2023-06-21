
const StandardDetails = ({desc}) => {
  const paragraphs = desc.split('\n').filter(paragraph => paragraph.trim() !== '');

  return (
    <p className="px-6 pb-4 text-[16px] tracking-wide">
      {paragraphs.map((paragraph, i) => (
        <>{paragraph}<br/></>
      ))}
    </p>
  )
}

export default StandardDetails