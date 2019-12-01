import { useContext } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import { getManaCurveHighchartsSeries } from '../lib/deck-stats';
import { ThemeContext } from './theme-context';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

export default function DeckManaCurve({ cards }) {
  const theme = useContext(ThemeContext);
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
      crosshair: true,
      lineColor: '#666666'
    },
    yAxis: {
      title: {
        enabled: false
      },
      tickInterval: 10,
      gridLineColor: '#666666',
      min: 0
    },
    tooltip: {
      headerFormat:
        '<span style="font-size:10px">' +
        'Mana cost: {point.key}' +
        '</span><table>',
      pointFormat:
        '<tr>' +
        '<td style="padding:0; font-size:10px;text-transform:capitalize;">{series.name}:</td>' +
        '<td style="padding:0;font-size:10px;"><b>{point.y}</b></td>' +
        '</tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0.1,
        borderColor: theme.background,
        stacking: 'normal'
      }
    },
    series: getManaCurveHighchartsSeries(cards, theme)
  };

  return (
    <div className="deck-mana-curve" data-cy="deckManaCurve">
      <style jsx>{``}</style>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

DeckManaCurve.propTypes = {
  cards: PropTypes.array
};
