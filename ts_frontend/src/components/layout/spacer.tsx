interface SpacerProps {
  pixel: number
}

const Spacer: React.FC<SpacerProps> = ({ pixel }) => {
  return <div className={`min-w-[${pixel}px]`} />
}

export default Spacer
