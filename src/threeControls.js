import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { useThreeContext } from './threeHooks';
import './threeControls.css';

const options = [
    { key: 1, text: 'KLT', value: 1 },
    { key: 2, text: 'GLT', value: 2 },
    { key: 3, text: 'Unterpalette', value: 3 },
    { key: 4, text: 'Einlage', value: 4 },
]

const ThreeControls = () => {

    const { setType, type, anzl, setAnzl, anzjl, setAnzjl, add, remove } = useThreeContext();

    return (
        <div className="controls">
            <Dropdown
                onChange={(e, { value }) => setType(value)}
                options={options}
                selection
                value={type}
                className="ui right labeled input"
            />
            <div
                className="ui right labeled input">
                <input
                    type="text" value={anzl}
                    onChange={e => setAnzl(Number(e.target.value))}
                />
                <div className="ui basic label label">ANZL</div>
            </div>
            <div className="ui right labeled input">
                <input type="text"
                    value={anzjl}
                    onChange={e => setAnzjl(Number(e.target.value))}
                />
                <div className="ui basic label label">ANZJL</div>
            </div>
            <button className="ui button" onClick={add}>
                Hinzufügen
            </button>
            <button className="ui button" onClick={remove}>
                Letzten entfernen
            </button>
        </div>
    )
}

export default ThreeControls;