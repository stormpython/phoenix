define(function (require) {
  return {
    control: {
      brush: require('src/modules/d3_components/control/brush'),
      events: require('src/modules/d3_components/control/events')
    },
    canvas: {
      rect: require('src/modules/d3_components/generator/element/canvas/rect')
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
    helpers: {
      builder: require('src/modules/d3_components/helpers/builder'),
      functor: require('src/modules/d3_components/helpers/functor'),
      scaletor: require('src/modules/d3_components/helpers/scaletor'),
      timeparser: require('src/modules/d3_components/helpers/timeparser'),
      valuator: require('src/modules/d3_components/helpers/valuator')
    },
    layout: {
      verticalBars: require('src/modules/d3_components/layout/bars/vertical'),
      horizontalBars: require('src/modules/d3_components/layout/bars/horizontal'),
      base: require('src/modules/d3_components/layout/base'),
      box: require('src/modules/d3_components/layout/box'),
      grid: require('src/modules/d3_components/layout/grid'),
      path: require('src/modules/d3_components/layout/path'),
      points: require('src/modules/d3_components/layout/points')
    },
    mixed: {
      chart: require('src/modules/d3_components/mixed/chart')
    }
  };
});
