import { View } from "react-native"
import { randomHexColor } from "../components/Btn"
import log from "../utils/log"
import { ScreenProps } from "./types"



const Test: ScreenProps<'Test'> = (props) => {

    log(props.route.params)

    const length = 6

    return (
        <View
        style={{
            flex: 1,
            // flexDirection: 'row',
        }}
        >
        {
        Array.from({length}).map( (_, k) => (
            <View 
            key={k}
            style={{
                backgroundColor: randomHexColor(),
                flex: Math.floor(Math.random() * 10)
            }}
            />
        ) )
        }
        </View>
    )
}

export default Test