<?php
    require 'includes/master.inc.php';

    if($Auth->loggedIn()) redirect(WEB_ROOT);

    if(!empty($_POST['regEmail']))
    {
        if($Auth->createNewUser($_POST['regEmail'], $_POST['regPassword']))
        {
          if($Auth->login($_POST['regEmail'], $_POST['regPassword']))
          {
              if(isset($_REQUEST['r']) && strlen($_REQUEST['r']) > 0)
                  redirect($_REQUEST['r']);
              else
                  redirect(WEB_ROOT);
          }
          else
              redirect(WEB_ROOT."#login");
        }
        else
            redirect(WEB_ROOT."#register");
    }
    else
        redirect(WEB_ROOT."#register");
?>