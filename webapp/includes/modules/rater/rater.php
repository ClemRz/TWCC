<?php
if (!isset($_POST['rater'])) exit();
// User settings
$rater_ip_voting_restriction	= RATER_RESTRINCTION; // restrict ip address voting (true or false)
$rater_ip_vote_qty						= RATER_IP_QTY; // how many times an ip address can vote
$rater_already_rated_msg			= sprintf(RATER_ERROR_MAX, $rater_ip_vote_qty);
$rater_not_selected_msg				= RATER_ERROR_EMPTY;
$rater_thankyou_msg						= RATER_THANKS;
$rater_generic_text						= THIS_ITEM; // generic item text
$rater_end_of_line_char				= RATER_EOL; // may want to change for different operating systems
$rater_img_folder							= DIR_WS_IMAGES;


if(!isset($rater_id)) $rater_id=1;
if(!isset($rater_item_name)) $rater_item_name=$rater_generic_text;


// DO NOT MODIFY BELOW THIS LINE
$rater_filename='item_'.$rater_id.'.rating';
$rater_rating=0;
$rater_stars="";
$rater_stars_txt="";
$rater_rating=0;
$rater_votes=0;
$rater_msg="";

// Rating action
if(isset($_REQUEST["rate".$rater_id])){
 if(isset($_REQUEST["rating_".$rater_id])){
	while(list($key,$val)=each($_REQUEST["rating_".$rater_id])){
		$rater_rating=$val;
  }
	//get ip address
	if (isset($_SERVER['HTTP_X_FORWARD_FOR'])) $rater_ip = $_SERVER['HTTP_X_FORWARD_FOR'];
	else $rater_ip = $_SERVER['REMOTE_ADDR'];
  //$rater_ip = getenv("REMOTE_ADDR"); 
	if (userHasRated($rater_filename, $rater_end_of_line_char, $rater_ip_voting_restriction, $rater_ip_vote_qty)) {
		$rater_msg=$rater_already_rated_msg;
	} else {
		$rater_file=fopen($rater_filename,"a+");
		fwrite($rater_file,$rater_rating."|".$rater_ip.$rater_end_of_line_char);
		fclose($rater_file);
	  $rater_msg=$rater_thankyou_msg;
	}
 }else{
  $rater_msg=$rater_not_selected_msg;
 }
}

// Get current rating
if(is_file($rater_filename)){
 $rater_file=fopen($rater_filename,"r");
 $rater_str="";
 $rater_str = fread($rater_file, 1024*8);
 if($rater_str!=""){
  $rater_data=explode($rater_end_of_line_char,$rater_str);
  $rater_votes=count($rater_data)-1;
  $rater_sum=0;
  foreach($rater_data as $d){
   $d=explode("|",$d);
   $rater_sum+=$d[0];
  }
  $rater_rating=number_format(($rater_sum/$rater_votes), 2, '.', '');
 }
 fclose($rater_file);
}else{
 $rater_file=fopen($rater_filename,"w");
 fclose($rater_file);
}

// Assign star image
if ($rater_rating <= 0  ){$rater_stars = $rater_img_folder."00star.gif";$rater_stars_txt="Not Rated";}
if ($rater_rating >= 0.5){$rater_stars = $rater_img_folder."05star.gif";$rater_stars_txt="0.5";}
if ($rater_rating >= 1  ){$rater_stars = $rater_img_folder."1star.gif";$rater_stars_txt="1";}
if ($rater_rating >= 1.5){$rater_stars = $rater_img_folder."15star.gif";$rater_stars_txt="1.5";}
if ($rater_rating >= 2  ){$rater_stars = $rater_img_folder."2star.gif";$rater_stars_txt="2";}
if ($rater_rating >= 2.5){$rater_stars = $rater_img_folder."25star.gif";$rater_stars_txt="2.5";}
if ($rater_rating >= 3  ){$rater_stars = $rater_img_folder."3star.gif";$rater_stars_txt="3";}
if ($rater_rating >= 3.5){$rater_stars = $rater_img_folder."35star.gif";$rater_stars_txt="3.5";}
if ($rater_rating >= 4  ){$rater_stars = $rater_img_folder."4star.gif";$rater_stars_txt="4";}
if ($rater_rating >= 4.5){$rater_stars = $rater_img_folder."45star.gif";$rater_stars_txt="4.5";}
if ($rater_rating >= 5  ){$rater_stars = $rater_img_folder."5star.gif";$rater_stars_txt="5";}


// Output
echo '<div class="hreview">';
echo '<form method="post" action="'.$_SERVER["PHP_SELF"].'" id="rater_form_'.$rater_id.'">';
echo '<h3 class="item"><span class="fn">'.$rater_item_name.'</span></h3>';
echo '<div>';
echo '<span  class="rating"><img src="'.$rater_stars.'?x='.uniqid((double)microtime()*1000000,1).'" alt="'.$rater_stars_txt.' stars"> '.sprintf(AVERAGE_RATING, $rater_stars_txt, $rater_votes).'</span>.';
echo '</div>';
echo '<div>';
echo '<label for="rate5_'.$rater_id.'"><input type="radio" value="5" name="rating_'.$rater_id.'[]" id="rate5_'.$rater_id.'">'.$rater_labels[4].'</label>'; //Excellent
echo '<label for="rate4_'.$rater_id.'"><input type="radio" value="4" name="rating_'.$rater_id.'[]" id="rate4_'.$rater_id.'">'.$rater_labels[3].'</label>'; //Very Good
echo '<label for="rate3_'.$rater_id.'"><input type="radio" value="3" name="rating_'.$rater_id.'[]" id="rate3_'.$rater_id.'">'.$rater_labels[2].'</label>'; //Good
echo '<label for="rate2_'.$rater_id.'"><input type="radio" value="2" name="rating_'.$rater_id.'[]" id="rate2_'.$rater_id.'">'.$rater_labels[1].'</label>'; //Fair
echo '<label for="rate1_'.$rater_id.'"><input type="radio" value="1" name="rating_'.$rater_id.'[]" id="rate1_'.$rater_id.'">'.$rater_labels[0].'</label>'; //Poor
echo '<input type="hidden" name="rs_id" value="'.$rater_id.'">';
echo '<input type="hidden" name="rate'.$rater_id.'" value="'.RATE.'">';
echo '<input type="submit" name="rate_'.$rater_id.'_btn" value="'.RATE.'">';
echo '</div>';
if($rater_msg!="") echo '<div class="warning">'.$rater_msg.'</div>';
echo '</form>';
echo '</div>';

?>

