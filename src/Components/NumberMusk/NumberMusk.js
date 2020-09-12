import React from 'react'
import './NumberMusk.scss'
import {IMaskInput} from 'react-imask'

const NumberMusk = props => {
    return (
        <div className={'number-musk'}>
            <IMaskInput
                mask={'+{7}(000)000-00-00'}
                unmask={false}
                placeholder='+7 ('
                value={props.phone}
            />
        </div>
    )
}

export default NumberMusk