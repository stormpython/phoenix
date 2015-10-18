define(function (require) {
  return {
    boxplot: require('src/modules/charts/boxplot'),
    dendrogram: require('src/modules/charts/dendrogram'),
    heatmap: require('src/modules/charts/heatmap'),
    histogram: require('src/modules/charts/histogram'),
    horizon: require('src/modules/charts/horizon'),
    pie: require('src/modules/charts/pie'),
    series: require('src/modules/charts/series'),
    sunburst: require('src/modules/charts/sunburst'),
    treemap: require('src/modules/charts/treemap')
  };
});