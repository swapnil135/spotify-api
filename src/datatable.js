import React from 'react'
import { CardColumns } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function datatable({ data }) {

    const style = {
        color: 'black',
        textDecoration: 'none'
    }
    const columnMap = {
        'name': 'Name',
        'release_date': 'Release Date',
        'total_tracks': 'Total Tracks'
    }
    var columns = []
    for (var v in data[0]) columns.push(v)
    // const columns = Object.keys(data[0])
    console.log(data[0])

    return <table className='blueTable' cellPadding={11} cellSpacing={11}>
        <thead>
            <tr>{data[0] &&

                columns.filter(column => column === 'name' || column === 'release_date' || column == 'total_tracks')
                    .map((heading) =>
                        <th>{columnMap[heading]}</th>
                    )}
                <th>Image</th></tr>
        </thead>
        <tbody>
            {data.map(row => <tr>
                {
                    columns.filter(column => column === 'name' || column === 'release_date' || column == 'total_tracks')
                        .map(column =>
                            (<td><a href={row['external_urls']['spotify']}>{row[column]}</a></td>)
                        )
                }
                <img src={row['images'][2]['url']} alt="" />
            </tr>)}
        </tbody>
    </table>
}


