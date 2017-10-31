import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-world-map',
  template: `<div id="visitfromworld" style="width:100%!important; height:415px"></div>`,
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#visitfromworld').vectorMap({
      map: 'world_mill_en'
      , backgroundColor: 'transparent'
      , borderColor: '#ccc'
      , borderOpacity: 0.9
      , borderWidth: 1
      , zoomOnScroll : false
      , color: '#ddd'
      , regionStyle: {
          initial: {
              fill: 'transparent'
          }
      }
      , markerStyle: {
          initial: {
              r: 8
              , 'fill': '#55ce63'
              , 'fill-opacity': 1
              , 'stroke': '#000'
              , 'stroke-width': 0
              , 'stroke-opacity': 1
          }
      , }
      , enableZoom: true
      , hoverColor: '#79e580'
      , markers: [{
          latLng: [21.00, 78.00]
          , name: 'India : 9347'
          , style: {fill: '#55ce63'}
      },
    {
      latLng : [-33.00, 151.00],
      name : 'Australia : 250'
      , style: {fill: '#02b0c3'}
    },
    {
      latLng : [36.77, -119.41],
      name : 'USA : 250'
      , style: {fill: '#11a0f8'}
    },
    {
      latLng : [55.37, -3.41],
      name : 'UK   : 250'
      , style: {fill: '#745af2'}
    },
    {
      latLng : [25.20, 55.27],
      name : 'UAE : 250'
      , style: {fill: '#ffbc34'}
    }]
      , hoverOpacity: null
      , normalizeFunction: 'linear'
      , scaleColors: ['#fff', '#ccc']
      , selectedColor: '#c9dfaf'
      , selectedRegions: []
      , showTooltip: true
      , onRegionClick: function (element, code, region) {
          var message = 'You clicked "' + region + '" which has the code: ' + code.toUpperCase();
          alert(message);
      }
  });
  }

}
