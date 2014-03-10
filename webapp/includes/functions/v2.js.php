<?php
/*

	Copyright Clément Ronzon

*/
?>
		<script type="text/javascript" src="http://www.google.com/jsapi?key=<?php echo KEY; ?>"></script>
    <script type="text/javascript">
    //<![CDATA[
		var map, geocoder, elevator, tilesLoadedListener, marker, myTitle, infoWindow, myZoom, elevationStatus,
				adsManager, publisher_id, channels_id, ads_flag, polyline;
		myTitle = '<?php echo DRAG_ME; ?>';
		myZoom = 14;
		elevationStatus = {OK:'OK',KO:'KO'};
		publisher_id = '<?php echo ADSENSE_ID; ?>';
		channels_id = {adUnit:'<?php echo ADUNIT_CHANNEL; ?>'};
		ads_flag = false;
		
		function getFakeControl(widthStr, heightStr) {
			var fakeControlDiv;
			fakeControlDiv = function() {};
			fakeControlDiv.prototype = new google.maps.Control();
			fakeControlDiv.prototype.initialize = function(map) {
				var container;
				container = $('<div/>').css('width', widthStr)
															 .css('height', heightStr)
															 .css('background-color', 'transparent')
															 .appendTo(map.getContainer());
				return container[0];
			}
			return new fakeControlDiv();
		}
		
		function getOSMCopyright() {
			var copyOSM;
			copyOSM = new google.maps.CopyrightCollection("<a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>");
			copyOSM.addCopyright(new google.maps.Copyright(1, new google.maps.LatLngBounds(new google.maps.LatLng(-90,-180), new google.maps.LatLng(90,180)), 0, " "));
			return copyOSM;
		}
		
		function getOSMALayer() { 
			var copyOSM, tilesOsmarender, mapOsmarender;
			copyOSM = getOSMCopyright();
			tilesOsmarender = new google.maps.TileLayer(copyOSM, 1, 17, {tileUrlTemplate: 'http://tah.openstreetmap.org/Tiles/tile/{Z}/{X}/{Y}.png'});
			mapOsmarender = new google.maps.MapType([tilesOsmarender], G_NORMAL_MAP.getProjection(), "OpenStreetMap", {alt: "OpenStreetMap layer"});
			return mapOsmarender;
		}
		
		function getMapnikLayer() {
			var copyOSM, tilesMapnik, mapMapnik;
			copyOSM = getOSMCopyright();
			tilesMapnik = new google.maps.TileLayer(copyOSM, 1, 18, {tileUrlTemplate: 'http://tile.openstreetmap.org/{Z}/{X}/{Y}.png'});
			mapMapnik = new google.maps.MapType([tilesMapnik], G_NORMAL_MAP.getProjection(), "Mapnik", {alt: "Mapnik layer"});
			return mapMapnik;
		}
		
		function initMap() {
			var myOptions;
			myOptions = {
				callback : mapLoaded,
				language : '<?php echo LANGUAGE_CODE; ?>',
				other_params : 'sensor=false'
			}
			google.load('maps', '2', myOptions);
		}
		
		function mapLoaded() {
			var myOptions, bannerHeight, OSMALayer, MapnikLayer;
			if (google.maps.BrowserIsCompatible()) {
				bannerHeight = $('#h-container').height();
				$('#ui-container').css('top', (bannerHeight+31).toString()+'px');
				geocoder = new google.maps.ClientGeocoder();
				OSMALayer = getOSMALayer();
				MapnikLayer = getMapnikLayer();
				myOptions = {mapTypes : [G_NORMAL_MAP, G_SATELLITE_MAP, G_HYBRID_MAP, G_PHYSICAL_MAP, G_SATELLITE_3D_MAP, OSMALayer, MapnikLayer]};
				map = new google.maps.Map2($('#map')[0], myOptions);
				map.setCenter(new google.maps.LatLng(0, 0), 2);
				setTimeout("readyToTransform('map', true)", <?php echo MAP_TIMEOUT_MS; ?>);
				map.setMapType(G_PHYSICAL_MAP);
				map.addControl(getFakeControl('100%', bannerHeight.toString()+'px'), new google.maps.ControlPosition(G_ANCHOR_TOP_LEFT, new google.maps.Size(0,0)));
				//(bannerHeight+458).toString()+'px'
				map.addControl(getFakeControl('267px', '100%'), new google.maps.ControlPosition(G_ANCHOR_TOP_RIGHT, new google.maps.Size(0,0)));
				map.addControl(new google.maps.SmallZoomControl3D(), new google.maps.ControlPosition(G_ANCHOR_TOP_LEFT, new google.maps.Size(4,bannerHeight+5)));
				map.addControl(new google.maps.ScaleControl(), new google.maps.ControlPosition(G_ANCHOR_BOTTOM_RIGHT, new google.maps.Size(4,15)));
				map.addControl(new google.maps.MapTypeControl(), new google.maps.ControlPosition(G_ANCHOR_TOP_RIGHT, new google.maps.Size(4,bannerHeight+5)));
				map.enableContinuousZoom();
				map.enableScrollWheelZoom();
				GEvent.addListener(map, 'click', function(overlay, latLng) {
					if (latLng) {
						map.closeInfoWindow();
						transform(latLng); //call setMarker
						hideAll();
					}
				});
				$('#view-map').bind("click", function(event) {
					event.preventDefault();
					codeAddress($('#find-location').val());
					hideAll();
				});
				$('#location-form').bind("submit", function(event) {
					event.preventDefault();
					$('#view-map').click();
				});
				initAdsManager();
				setAppVersion();
				tilesLoadedListener = GEvent.addListener(map, 'tilesloaded', function() {
					GEvent.removeListener(tilesLoadedListener);
					readyToTransform('map');
				});
			}
		}
		
		function getClientLatLng() {
      if (google.loader.ClientLocation) {
        return new google.maps.LatLng(google.loader.ClientLocation.latitude, google.loader.ClientLocation.longitude);
      } else {
        return undefined;
      }
    }
		
		function setMarker(WGS84) {
//if (console != undefined) console.log('[!] [setMarker] Called back.');
      var myLatLng, icon, myLatLngArray, bounds;
			if (WGS84.length == 1) { //marker
				if (polyline) {
					map.removeOverlay(polyline);
					polyline = undefined;
				}
				WGS84 = WGS84[0];
				icon = new google.maps.Icon();
				icon.image = '<?php echo DIR_WS_IMAGES; ?>twcc_icon.png';
				icon.shadow = '<?php echo DIR_WS_IMAGES; ?>twcc_icon_shadow_v2.png';
				icon.iconSize = new google.maps.Size(40, 55);
				icon.shadowSize = new google.maps.Size(60, 55);
				icon.iconAnchor = new google.maps.Point(19, 55);
				icon.infowindowAnchor = new google.maps.Point(0, 55);
				icon.printImage = '<?php echo DIR_WS_IMAGES; ?>twcc_icon.png';
				icon.mozPrintImage = '<?php echo DIR_WS_IMAGES; ?>twcc_icon.png';
				icon.printShadow = '<?php echo DIR_WS_IMAGES; ?>twcc_icon_shadow_v2.png';
				icon.transparent = '<?php echo DIR_WS_IMAGES; ?>twcc_icon_transparent.png';
				myLatLng = (WGS84.lat) ? WGS84 : new google.maps.LatLng(WGS84.y, WGS84.x);
				if (marker) {
					marker.setLatLng(myLatLng);
				} else {
					marker = new google.maps.Marker(myLatLng, {
						title: myTitle,
						icon: icon,
						draggable: true,
						bouncy: true
					});
					GEvent.addListener(marker, 'dragend', function() {
						var latlng;
						latlng = marker.getLatLng();
						transform(latlng); //call setMarker
					});
					GEvent.addListener(marker, 'dragstart', function() {
						map.closeInfoWindow();
						hideAll();
					});
					map.addOverlay(marker);
				}
				codeLatLng(myLatLng);
				setLength();
			} else { //polyline
				if (marker) {
					map.closeInfoWindow();
					map.removeOverlay(marker);
					marker = undefined;
				}
				myLatLngArray = [];
				$.each(WGS84, function() {
					if (this.lat == undefined && this.x == undefined) return true; //INPUT ERROR => continue
					myLatLng = (this.lat) ? this : new google.maps.LatLng(this.y, this.x);
					myLatLngArray.push(myLatLng);
				});
				if (polyline) {
					map.removeOverlay(polyline);
				}
				polyline = new google.maps.Polyline(myLatLngArray, "#000000", 3, 1, {geodesic: true});
				map.addOverlay(polyline);
				polyline.enableEditing();
				GEvent.addListener(polyline, 'lineupdated', function() {
					var i, vertex;
					WGS84 = [];
					for (i=0; i<polyline.getVertexCount(); i++) {
						vertex = polyline.getVertex(i);
						WGS84.push({'x':vertex.lng(), 'y':vertex.lat()});
					}
					converterHash.transform(WGS84); //call setMarker
				});
				bounds = polyline.getBounds();
				if (bounds) map.setCenter(bounds.getCenter(), map.getBoundsZoomLevel(bounds)-1);
				setLength(polyline.getLength());
				setArea(new google.maps.Polygon(myLatLngArray).getArea());
			}
		}
		
		function codeLatLng(latlng) {
			var html, tabs, options, elevation, directLink, iso;
			$.post('<?php echo DIR_WS_INCLUDES; ?>a.php', {t: latlng.lat().toString(), g: latlng.lng().toString()}, function(data) {
				elevation = '';
				if (data.status == elevationStatus.OK) {
					if (data.results[0]) {
						elevation = '<p style="float:right;"><img src="<?php echo DIR_WS_IMAGES; ?>elevation_icon.png" alt="<?php echo ELEVATION; ?>" title="<?php echo ELEVATION; ?>" style="float:left;" /> ' + data.results[0].elevation.toString().split('.')[0] + 'm</p>';
					}
				}
				geocoder.getLocations(latlng, function(response) {
					html = '';
					if (response && response.Status.code == 200) {
						if (response.Placemark[0]) {
							html = '<p>';
							if (map.getZoom() < myZoom) {
								html = html + '<a href="JavaScript:doZoom();" class="zoom" title="<?php echo ZOOM; ?>" style="text-decoration:none;float:right;"><img src="<?php echo DIR_WS_IMAGES; ?>zoom_icon.png" alt="<?php echo ZOOM; ?>" style="border:0px none;vertical-align:middle;" /></a>';
							}
							html = html + '<img src="<?php echo DIR_WS_IMAGES; ?>address_icon.png" alt="<?php echo ADDRESS; ?>" title="<?php echo ADDRESS; ?>" style="float:left;" /> ' + response.Placemark[0].address + ' ';
							if (response.Placemark[0].AddressDetails) {
								if (response.Placemark[0].AddressDetails.Country) {
									iso = response.Placemark[0].AddressDetails.Country.CountryNameCode;
									if (iso && iso != '') {
										html = html + '<img src="<?php echo DIR_WS_IMAGES; ?>flags/' + iso + '.png" alt="' + iso + '" style="vertical-align:middle;" />';
									}
								}
							}
							html = html + '</p>';
						}
					}
					options = {pixelOffset : new google.maps.Size(0, -55)};
					map.closeInfoWindow();
					html = '<div class="iw-content"><h3>' + myTitle + '</h3>' + html + '<div class="divp">' + elevation + '<p style="float:left;"><img src="<?php echo DIR_WS_IMAGES; ?>gps_icon.png" alt="GPS (WGS84)" title="GPS (WGS84)" style="float:left;" />' + latlng.lat() + '°N<br />' + latlng.lng() + '°E</p></div>';
					directLink = '<div><a href="JavaScript:getDirectLink(\'directurl\');" id="directurl" style="text-decoration:none;" title="<?php echo DIRECT_LINK; ?>"><img src="<?php echo DIR_WS_IMAGES; ?>url.png" alt="<?php echo DIRECT_LINK; ?>" style="border:0px none;vertical-align:middle;" /> <?php echo DIRECT_LINK; ?></a></div>';
					html = html + directLink + '</div>';
<?php if (IW_ADS_ENABLED) { ?>
					if (!ads_flag) {
						ads_flag = true;
						html = $(html).append($('#twcc-ads>ins').clone(true));
						html = html[0];
					}
<?php } ?>
					map.openInfoWindowHtml(latlng, html, options);
				});
			}, 'json');
		}
		
		function doZoom() {
			var latlng;
			$('.zoom').remove();
			latlng = marker.getLatLng();
			if (map.getZoom() < myZoom) {
				map.setCenter(latlng, myZoom);
			}
		}
		
		function codeAddress(address) {
			var latlng;
			geocoder.getLatLng(address, function(point) {
				if (!point) {
					alert("<?php echo GEOCODER_FAILED; ?>" + status);
				} else {
					latlng = point;
					transform(latlng); //call setMarker
				}
			});
		}
		
		function getAPIVersion() {
			return '2.'+G_API_VERSION;
		}
		
		function initAdsManager() {
			var adsManagerOptions;
			adsManagerOptions = {
				maxAdsOnMap : 2,
				style : G_ADSMANAGER_STYLE_ADUNIT,
				position : new google.maps.ControlPosition(G_ANCHOR_BOTTOM_LEFT, new google.maps.Size(4, 134)),
				channel : channels_id.adUnit
			};
			adsManager = new google.maps.AdsManager(map, publisher_id, adsManagerOptions);
			adsManager.enable();
		}
		
		function unload() {
      if (google.maps) {
				google.maps.Unload();
			}
		}
    //]]>
    </script>
