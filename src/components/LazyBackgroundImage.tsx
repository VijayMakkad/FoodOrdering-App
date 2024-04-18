import React, { useState } from 'react'

type Props = {
  img: string
  children?: JSX.Element[] | JSX.Element
  style?: React.CSSProperties
}

export default function LazyBackgroundImage({ img, children, style }: Props) {
  const [loaded, setLoaded] = useState(false)

  const handleLoad = () => {
    setLoaded(true)
  }

  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        filter: loaded ? 'none' : 'blur(20px)',
        transition: 'filter 0.5s',
        ...style,
      }}
    >
      <img src={img} alt="" onLoad={handleLoad} style={{ display: 'none' }} />
      {loaded && children}
    </div>
  )
}
