import React, { useState } from'react'
import {TouchableOpacity, View, Text} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

function ColorPicker(props) {
    let iconsMap = {
        'red':true,
        'blue':false,
        'green':false,
        'orange':false,
        'pink':false,
        'yellow':false,
        'purple':false,
        'black':false,
        'coral':false, 
        'lime':false, 
    }

    const [selectedIcon, setSelectedIcon] = useState('red')
    const [icon, setIcon] = useState(iconsMap)

    const selectIcon = (key) => {

/*         let newColors = colors;
        newColors[selectedColor] = false;
        newColors[key] = true

        setColors(newColors)
        setSelectedColor(key);
        props.onColorChange(key); */
    }

    return (
        <View style={{flex:1, flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>
            
            {Object.keys(colors).map((color) => {
                return (
                    <TouchableOpacity onPress={() => selectColor(color)}>
                        {colors[color] ? 
                            <View style={{margin: 7, height:40, width:40, borderRadius:20, borderWidth:10, borderColor:color, backgroundColor:"#fff"}}></View>
                        : 
                            <View style={{margin: 7, height:40, width:40, borderRadius:20, backgroundColor:color}}></View>
                        }
                       
                    </TouchableOpacity>
                )
            })}


        </View>
    )

}

export default ColorPicker