import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";


export type RootStackParamList = {
    Users: any;
    Test: any;
}


export type ScreenProps<T extends keyof RootStackParamList> = FC<NativeStackScreenProps<RootStackParamList, T>>