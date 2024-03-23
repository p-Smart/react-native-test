import { Animated, Easing, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { neutral } from "../theme/palette"
import { useEffect, useRef } from "react";




const VideoLoader = () => {

    const rotateValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [rotateValue]);

    const spin = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });




    return (
        <View
        style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 99,
            backgroundColor: `rgba(0,0,0,0.85)`,
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >
        <Animated.View
        style={{
            transform: [{ rotate: spin }]
        }}
        >
        <Icon
        name="sync"
        size={50}
        color={neutral[50]}
        />
        </Animated.View>
        </View>
    )
}


export default VideoLoader