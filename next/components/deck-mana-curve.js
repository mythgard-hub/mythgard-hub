import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import { getManaCurve } from '../lib/deck-stats';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

export default function DeckManaCurve({ cards }) {
  const manaCurve = getManaCurve(cards);
  const options = {
    chart: {
      type: 'column',
      backgroundColor: 'rgba(0,0,0,0)',
      height: '200px'
    },
    exporting: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: ['1', '2', '3', '4', '5', '6+'],
      crosshair: true
    },
    yAxis: {
      title: {
        enabled: false
      },
      min: 0
    },
    tooltip: {
      headerFormat:
        '<span style="font-size:10px">Mana cost: {point.key}</span><table>',
      pointFormat:
        '<tr>' +
        '<td style="padding:0; font-size:10px;">{series.name}:</td>' +
        '<td style="padding:0;font-size:10px;"><b>{point.y}</b></td>' +
        '</tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [
      {
        name: 'Cards',
        showInLegend: false,
        data: manaCurve
      }
    ]
  };

  return (
    <div className="deck-mana-curve">
      <style jsx>{``}</style>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

DeckManaCurve.propTypes = {
  cards: PropTypes.array
};
