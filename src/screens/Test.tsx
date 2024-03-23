import { View } from "react-native"
import log from "../utils/log"
import { ScreenProps } from "./types"
import Video from "react-native-video"
import { neutral } from "../theme/palette"
import waitForTimeout from "../utils/waitForTimeout"
import VideoLoader from "../components/VideoLoader"



const Test: ScreenProps<'Test'> = (props) => {

    const handleVideoBuffer = () => {
        log('Video is buffering...')
    }

    return (
        <View
        style={{
            flex: 1,
            backgroundColor: neutral[900],
        }}
        >
        <View style={{flex: 0.5}}>
        <Video
        style={{flex: 1}}
        controls
        resizeMode="contain"
        source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        onBuffer={handleVideoBuffer}
        />
        <VideoLoader />
        </View>
        </View>
    )
}

export default Test