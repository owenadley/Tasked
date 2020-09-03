import React, { useState } from'react'
import {TouchableOpacity, View, Text} from 'react-native'

function ColorPicker(props) {
    let colorsMap = {
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

    const [selectedColor, setSelectedColor] = useState('red')
    const [colors, setColors] = useState(colorsMap)

    const selectColor = (key) => {
        console.log('in selected')

        let newColors = colors;
        newColors[selectedColor] = false;
        newColors[key] = true

        setColors(newColors)
        setSelectedColor(key);
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