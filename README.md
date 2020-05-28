TWCC
====
TWCC, "The World Coordinate Converter", is a tool to convert geodetic coordinates in a wide range of reference systems.

Several coordinate conversion tools already exist, however, here is what makes the strength of TWCC:

This tool is intuitive and easy to use.
The possibility to add user-defined systems and the use of an interactive map make it flexible.
No download or special installation is required, you just need to have an Internet connection.
TWCC is compatible with most environments (Mac, Linux, Windows...). W3C HTML5 compliant
TWCC is completely FREE and licensed under Affero GNU Public License. See agpl.txt for more info about the license.
TWCC was created by Clément Ronzon following research and development carried out for GrottoCenter.org.

Special thanks to: Roland Aigner, Alessandro Avaro, Leszek Pawlowicz, Lê Viết Thanh.

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
  * out: output system code. The code must be registered in TWCC database. Ex.: "EPSG:4230" (remember to URL encode it).
        
 - Example of url: [http://twcc.fr/en/ws/?fmt=json&x=33&y=44&in=WGS84&out=EPSG%3A4230](http://twcc.fr/en/ws/?fmt=json&x=33&y=44&in=WGS84&out=EPSG%3A4230)
    
## Deploy process:

### Web application:

In the project's root run the following:
```shell script
$ npm install
$ cd webapp
$ npm install
$ npm run build
$ cd ..
$ grunt -f
```

### Web service:

In the project's root run the following:
```shell script
$ cd webapp/includes
$ php composer.phar install
```