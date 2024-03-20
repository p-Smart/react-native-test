import React, { useEffect, useRef } from "react"
import { Animated, ColorValue } from "react-native"
import { neutral } from "../theme/palette";




interface SkeletonProps {
    variant?: 'box' | 'circle';
    width?: number | `${number}%`;
    height?: number | `${number}%`;
    color?: ColorValue;
}


const Skeleton: React.FC<SkeletonProps> = ({
    variant,
    width,
    height,
    color
}) => {
    const opacity = useRef(new Animated.Value(0.3))

    let borderRadius = 10;

    if(variant==='circle'){
        borderRadius = typeof height === 'string' ? parseInt(height) / 2 : height / 2;
    }

    useEffect( () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity.current, {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 500,
                }),
                Animated.timing(opacity.current, {
                    toValue: 0.3,
                    useNativeDriver: true,
                    duration: 800,
                }),
            ])
        ).start()
    }, [opacity] )


    return (
        <Animated.View 
        style={[
            {
                opacity: opacity.current, 
                height: height || 15,
                width: width || '100%',
                borderRadius
            },
            {
                backgroundColor: color || neutral[400]
            }
        ]}
        />
    )
}

export default Skeleton