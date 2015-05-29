TWCC
====
TWCC, "The World Coordinate Converter", is a tool to convert geodetic coordinates in a wide range of reference systems.

Several coordinate conversion tools already exist, however, here is what makes the strength of TWCC:

This tool is intuitive and easy to use.
The possibility to add user-defined systems and the use of an interactive map make it flexible.
No download or special installation is required, you just need to have an Internet connection.
TWCC is compatible with most environments (Mac, Linux, Windows...). W3C HTML5 compliant
TWCC is completely FREE and licensed under Affero GNU Public License. See agpl.txt for more info about the license.
TWCC was created by Cl�ment Ronzon following research and development carried out for GrottoCenter.org.

Special thanks to: Roland Aigner, Alessandro Avaro, Leszek Pawlowicz, L� Vi?t Thanh.

For any questions or suggestions please contact us.

You can donate to support this initiative.

## How to consume the web service:
Web service is still on beta version, consume it at your own risks:

 - Url of the web-service: http://twcc.fr/en/ws/
 - Parameters:
    
  * fmt: format of the output message. Possibles values are "xml" or "json" ("xml" if omitted).
  * x: x coordinate value (longitude) in decimal degrees or meters.
  * y: y coordinate value (latitude) in decimal degrees or meters.
  * in: input system code. The code must be registered in TWCC database. Ex.: "WGS84".
  * out: output system code. The code must be registered in TWCC database. Ex.: "EPSG:4230".
        
 - Example of url: http://twcc.fr/en/ws/?fmt=json&x=33&y=44&in=WGS84&out=EPSG:4230

## NPM dependencies

 - grunt-contrib-uglify
 - grunt-contrib-cssmin
 - grunt-contrib-jshint
 - grunt-contrib-watch
 - grunt-contrib-concat
 - grunt-text-replace
 - grunt-contrib-clean
 - grunt-git
    
## Deploy

```
grunt -f
```