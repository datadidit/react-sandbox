export const getFamilyCells = (index, row) => {
    if(row !== undefined){
        switch(index){
            case 0:
                return row['name']
            case 1:
                return row['age']
            case 2:
                return row['weight']
            case 3:
                return row['height']
        }
    }else{
        console.log("Shouldn't happen " + row)
    }
}

const getName = (row) => {
    return row.first_name+" "+row.last_name
}

export const headers = [
    {
        title: 'Player',
        name: 'player',
        getCellValue: row => getName
    },
    {
        title: 'AB',
        name: 'ab'
    },
    {
        title: 'AO',
        name: 'ao'
    },
    {
        title: 'Sac Bunt',
        name: 'b_sac'
    },
    {
        title: 'Bats',
        name: 'bats'
    },
    {
        title: 'BB',
        name: 'bb'
    }
]

export const getBattingStats = (columnIndex, headers, row) => {
    let columnSelector = headers[columnIndex]
    if('getCellValue' in columnSelector){
        const funct = columnSelector.getCellValue
        //console.log(columnSelector.getCellValue(row))
        return getName(row)
    }else{
        return row[columnSelector['name']]
    }
}
