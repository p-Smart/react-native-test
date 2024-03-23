import React, { PropsWithChildren, useState } from "react"
import { Image, LayoutChangeEvent, Text, View } from "react-native"
import { grey, neutral, primary } from "../theme/palette"
import Icon from "react-native-vector-icons/MaterialIcons"
import Button from "./Button"
import log from "../utils/log"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"


const logo = {
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    width: 64,
    height: 64
}

interface ILayout {}


const Layout: React.FC<PropsWithChildren<ILayout>> = ({
    children,
}) => {
    const {navigate} = useNavigation<NativeStackNavigationProp<any>>()
    
    const navMenu = [
        {
            title: 'Home',
            icon: 'home',
            route: 'home'
        },
        {
            title: 'Settings',
            icon: 'settings',
            route: 'test'
        },
    ]

    const [headerLayout, setHeaderLayout] = useState({ width: 0, height: 0 })
    const [navBottomLayout, setNavBottomLayout] = useState({ width: 0, height: 0 })

    const handleHeaderLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout
        setHeaderLayout({ width, height })
    }
    const handleNavBottomLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout
        setNavBottomLayout({ width, height })
    }



    return (
    <View
    style={{
      flex: 1,
      gap: 20,
      paddingTop: headerLayout.height,
      paddingBottom: navBottomLayout.height-20,
      backgroundColor: 'red'
    }}
    >
    <View
    onLayout={handleHeaderLayout}
    style={{
      backgroundColor: primary.main,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
      gap: 5,
      position: 'absolute',
      width: '100%',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      zIndex: 10,
    }}
    >
      <Image
      source={{
        uri: logo.uri,
        width: 30,
        height: 30
      }}
      />
      <Text style={{color: '#fff', fontSize: 25, fontWeight: '600'}}>
        Native App
      </Text>
    </View>


    <View
    style={{
        flex: 1
    }}
    >
    {children}
    </View>


    <View
    onLayout={handleNavBottomLayout}
    style={{
      backgroundColor: primary.main,
      width: '100%',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      borderTopWidth: 0.5,
      borderTopColor: primary.darker,
      elevation: 3,
      zIndex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 5
    }}
    >
    {
    navMenu.map( (props, k) => (
        <Button
        key={k}
        style={{
            backgroundColor: primary.dark,
            paddingHorizontal: 8,
            paddingVertical: 5,
            borderRadius: 3
        }}
        onClick={() => {
            navigate(props.route)
        }}
        >
        <Icon
        name={props.icon}
        size={20}
        color={neutral[50]}
        />
        </Button>
    ) )
    }
    </View>
    </View>
    )
}

export default Layout