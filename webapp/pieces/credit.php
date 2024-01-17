<div id="credits">
    <div id="c-title"><?php echo CREDIT; ?></div>
    <ul>
        <?php if (false) { ?>
            <li><?php echo HOSTING; ?> <a href="https://www.ovh.com" target="_blank">OVH</a></li>
        <?php } ?>
        <li><?php echo CONSTANTS; ?> <a href="https://spatialreference.org" target="_blank">Spatial Reference</a></li>
        <li><?php echo LIBRARIES; ?> <a href="https://proj4js.org" target="_blank">Proj4js</a>,
            <a href="https://jquery.com/" target="_blank">JQuery</a>,
            <a href="https://jqueryui.com/" target="_blank">JQuery UI</a>,
            <?php if (!IS_LIGHT) { ?>
                <a href="https://github.com/cmweiss/geomagJS" target="_blank">GeomagJS</a>,
            <?php } ?>
            <a href="https://www.grottocenter.org/" target="_blank">GrottoCenter.org</a></li>
        <?php if (!IS_LIGHT) { ?>
            <li><?php echo MAPS; ?> <a href="https://openlayers.org" target="_blank">OpenLayers</a>,
                <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a>,
                <a href="https://www.esri.com/" target="_blank">ESRI</a></li>
        <?php } ?>
    </ul>
</div>