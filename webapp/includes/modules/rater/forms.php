<?php require('../../application_top.php'); ?>
<h2><?php echo PLEASE_TAKE_A_MOMENT; ?></h2>
<p><?php echo POLL_COMMENTS; ?></p>
<?php
foreach ($rater_items as $rater_item) {
	$rater_id = $rater_item['id'];
	$rater_item_name = $rater_item['item_name'];
	$rater_labels = $rater_item['item_labels'];
	include("rater.php");
}
?>
<div style="text-align:right;"><a href="" class="contact link" title="<?php echo LEAVE_A_COMMENT; ?>"><?php echo LEAVE_A_COMMENT; ?></a></div>