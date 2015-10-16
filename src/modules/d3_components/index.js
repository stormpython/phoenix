define(function (require) {
  return {
    chart: {
      boxplot: require('src/modules/d3_components/chart/boxplot'),
      dendrogram: require('src/modules/d3_components/chart/dendrogram'),
      heatmap: require('src/modules/d3_components/chart/heatmap'),
      pie: require('src/modules/d3_components/chart/pie'),
      series: require('src/modules/d3_components/chart/series'),
      sunburst: require('src/modules/d3_components/chart/sunburst'),
      treemap: require('src/modules/d3_components/chart/treemap')
    },
    control: {
      brush: require('src/modules/d3_components/control/brush'),
      events: require('src/modules/d3_components/control/events')
    },
    element: {
      circle: require('src/modules/d3_components/generator/element/svg/circle'),
      div: require('src/modules/d3_components/generator/element/html/div'),
      ellipse: require('src/modules/d3_components/generator/element/svg/ellipse'),
      image: require('src/modules/d3_components/generator/element/svg/image'),
      line: require('src/modules/d3_components/generator/element/svg/line'),
      path: require('src/modules/d3_components/generator/element/svg/path'),
      rect: require('src/modules/d3_components/generator/element/svg/rect'),
      text: require('src/modules/d3_components/generator/element/svg/text')
    },
    generator: {
      axis: require('src/modules/d3_components/generator/axis/axis'),
      bars: require('src/modules/d3_components/generator/bars'),
      boxPlot: require('src/modules/d3_components/generator/boxplot'),
      clipPath: require('src/modules/d3_components/generator/clippath'),
      legend: require('src/modules/d3_components/generator/legend'),
      path: require('src/modules/d3_components/generator/path'),
      points: require('src/modules/d3_components/generator/points')
    },
    layout: {
      bars: require('src/modules/d3_components/layout/bars'),
      base: require('src/modules/d3_components/layout/base'),
      box: require('src/modules/d3_components/layout/box'),
      grid: require('src/modules/d3_components/layout/grid'),
      path: require('src/modules/d3_components/layout/path'),
      scatter: require('src/modules/d3_components/layout/scatter')
    },
    mixed: {
      chart: require('src/modules/d3_components/mixed/chart')
    }
  };
});
