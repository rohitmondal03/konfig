import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          display: "flex",
          width: "30px",
          height: "30px",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "5px",
          backgroundColor: "white",
          fontWeight: "700",
          color: "black",
          fontSize: "20px"
        }}
      >
        K
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}