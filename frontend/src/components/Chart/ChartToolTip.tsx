import React, { useEffect, useRef, useState } from 'react'
import { Circle, LegendCircleContainer, LegendItemContainer, LegendSpan, LegendSubItemContainer, NonWrapSpan, SChartLightStroke, SChartRect, SsvgChartForeground, ToolTipBorder, ToolTipContentColumn, ToolTipContentContainer, ToolTipDateContainer, ToolTipHorizontalContainer, ToolTipItemContainer, ToolTipSubItem } from './styles'

interface ChartToolTipProps {
    legendItems: LegendItem[],
    formattedDate: string,
    hidden: boolean,
    position: {x: number, y: number},
    setRef: any
}

export interface LegendItem {
    color: string,
    value: string,
    name: string
}

const ChartToolTip: React.FC<ChartToolTipProps> = ({legendItems, formattedDate, position, hidden, setRef}) => {
    const toolTipRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (toolTipRef.current && setRef)
            setRef(toolTipRef.current)
    }, [toolTipRef, setRef])
	return (<ToolTipBorder onClick={(e) => e.preventDefault()} ref={toolTipRef} style={hidden? {"left": position.x, "top": position.y, visibility: "hidden"}: {"left": position.x, "top": position.y}}>
                <ToolTipDateContainer>
                    <NonWrapSpan>{formattedDate}</NonWrapSpan>
                </ToolTipDateContainer>
                <ToolTipContentContainer>
                    <ToolTipContentColumn>
                    {
                        legendItems.map((item, index) => {
                            return (<ToolTipHorizontalContainer key={index}>
                                <LegendCircleContainer>
                                    <Circle style={{"backgroundColor": item.color}}/>
                                </LegendCircleContainer>
                                <ToolTipSubItem>
                                    <NonWrapSpan>{item.name}:</NonWrapSpan>
                                </ToolTipSubItem>
                            </ToolTipHorizontalContainer>)
                        })
                    }
                    </ToolTipContentColumn>
                    <ToolTipContentColumn>
                    {
                        legendItems.map((item, index) => {
                            return (<ToolTipItemContainer key={index}>
                                <ToolTipSubItem>
                                    <NonWrapSpan><b>{item.value}</b></NonWrapSpan>
                                </ToolTipSubItem>
                            </ToolTipItemContainer>)
                        })
                    }
                    </ToolTipContentColumn>
                </ToolTipContentContainer>
        </ToolTipBorder>
	)
}

export default ChartToolTip
