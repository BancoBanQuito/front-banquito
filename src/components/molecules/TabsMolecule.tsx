import React, { useState } from 'react'
import { Tab, Tabs } from "@mui/material";

interface TabsMoleculeProps {
    items: { label: string, value: any }[];
    defaultValue?: string;
    orientation?: "vertical" | "horizontal";
    onChange?: (value: any) => void;
    textColor?: "primary" | "secondary",
    indicatorColor?: "primary" | "secondary",
}

const TabsMolecule = (props: TabsMoleculeProps) => {

    const [actualTab, setactualTab] = useState<any>(props.defaultValue || props.items[0].value);

    const handleChange = (event: any, value: any) => {
        setactualTab(value);
        props.onChange && props.onChange(value);
    }

    return (
        <Tabs
            indicatorColor={props.indicatorColor}
            textColor={props.textColor}
            centered
            defaultValue={actualTab}
            value={actualTab}
            onChange={handleChange}
            orientation={props.orientation || 'vertical'}
            sx={{
                width: "100%",
                maxWidth: '20rem',
            }}>
            {
                props.items.map((tab, index) => {
                    return <Tab
                        key={index}
                        label={tab.label}
                        value={tab.value} />
                })
            }
        </Tabs>
    )
}

export default TabsMolecule