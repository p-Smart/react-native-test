import axios from 'axios';
import React, { useRef, useState } from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import log from '../utils/log';
import Button from '../components/Button';
import { grey } from '../theme/palette';
import Skeleton from '../components/Skeleton';
import { ScreenProps } from './types';

const UsersView: ScreenProps<'Users'> = (props) => {
    const [loading, setLoading] = useState(false)
    const initialList = [
        {
        name: 'Ajayi Prince',
        image: '',
        tel: '+2349063900991',
        email: 'princeayokunle2002@gmail.com'
        },
        {
        name: 'Akindele Abraham',
        image: '',
        tel: '',
        email: ''
        },
        {
        name: 'Muheez Shuabu',
        image: '',
        tel: '',
        email: ''
        },
        {
        name: 'Adeoye Christian',
        image: '',
        tel: '',
        email: ''
        },
        {
        name: 'Babajide Folakemi Oreoluwa',
        image: '',
        tel: '',
        email: ''
        },
    ]
    const [list, setList] = useState(initialList)
    const scrollViewRef = useRef<ScrollView>(null)
    

    const fetchData = async () => {
        try{
        setLoading(true)
        scrollToBottom()
        const {data} = await axios.get('https://randomuser.me/api?results=5')

        const users = data.results.map( (user) => ({
            name: user.name.first + ' ' + user.name.last,
            email: user.email,
            image: user.picture.medium,
            tel: user.phone,
        }) )

        setList(prevVal => [...prevVal, ...users])
        }
        catch(err){
        log('Error', err.message)
        }
        finally{
        setLoading(false)
        }
    }

    const scrollToBottom = () => {
        const ScrollViewRef = scrollViewRef.current
        ScrollViewRef.scrollToEnd({animated: true});
    };


    return (
        <ScrollView
        bounces={false}
        ref={scrollViewRef}
        style={{
            paddingHorizontal: 10,
            marginVertical: 10
        }}
        >
        {
        list.map( (item, k) => (
        <User 
        key={k}
        item={item}
        index={k}
        />
        ) )
        }

        {
        loading &&
        Array.from({length: 3}).map( (_, k) => (
            <UserLoading
            key={k}
            />
        ) )
        }


        <Button
        title='Load More'
        loading={loading}
        fullWidth
        onClick={() => fetchData()}
        style={{
        alignSelf: 'center'
        }}
        />
        </ScrollView>
    );
};

export default UsersView;









interface IUser {
    item?: any;
    index?: number;
    loading?: boolean;
}
const User = ({item, index}: IUser) => {

    return (
        <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginBottom: 20
        }}
        >
        <Text>
            {index+1}.
        </Text>
        <View
        style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: grey.light,
            overflow: 'hidden',
        }}
        >
        <Image 
        style={{
            width: '100%',
            height: '100%'
        }}
        {...{
            source: item?.image ? {
            uri: item?.image
            } : require('../assets/images/avatars/avatar-anika-visser.png')
        }}
        />
        </View>
        <View 
        style={{
            gap: 5
        }}
        >
        <Text
        style={{
            fontSize: 16,
            fontWeight: '600'
        }}
        >
            {item?.name}
        </Text>
        {
        item?.email &&
        <Text
        >
            {item?.email}
        </Text> 
        }
        {
        item?.tel &&
        <Text
        >
            {item?.tel}
        </Text>
        }
        </View>
        </View>
    )
}


const UserLoading = () => {

    return (
        <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginBottom: 20
        }}
        >
        <Text>
        .
        </Text>
        <View
        style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: grey.light,
            overflow: 'hidden',
        }}
        >
        <Skeleton
        height='100%'
        />
        </View>
        <View 
        style={{
            gap: 5
        }}
        >
        <Skeleton width={50} />
        <Skeleton width={100} />
        <Skeleton width={80} />
        </View>
        </View>
    )
}