
const StandardDetails = ({desc}) => {
  const paragraphs = desc.replace(/\\n/g, '\n').split('\n').filter(paragraph => paragraph.trim() !== '');

  return (
    <div className="px-6 pb-4 text-[16px] tracking-wide space-y-3">
      {paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  )
}

export default StandardDetails
