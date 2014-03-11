<?php
/**
 * This file is part of TWCC.
 *
 * TWCC is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * TWCC is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with TWCC.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @copyright Copyright (c) 2010-2014 Clément Ronzon
 * @license http://www.gnu.org/licenses/agpl.txt
 */
require('../../application_top.php'); ?>
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