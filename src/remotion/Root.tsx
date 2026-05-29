import { Composition, Series } from 'remotion'
import { Intro } from './Intro'
import { Stats } from './Stats'
import { Outro } from './Outro'

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PadelPromo"
        component={PadelPromoVideo}
        durationInFrames={480}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  )
}

const PadelPromoVideo: React.FC = () => {
  return (
    <Series>
      {/* Intro : 5s = 150 frames */}
      <Series.Sequence durationInFrames={150}>
        <Intro />
      </Series.Sequence>

      {/* Stats : 8s = 240 frames */}
      <Series.Sequence durationInFrames={240}>
        <Stats />
      </Series.Sequence>

      {/* Outro / CTA : 3s = 90 frames */}
      <Series.Sequence durationInFrames={90}>
        <Outro />
      </Series.Sequence>
    </Series>
  )
}
