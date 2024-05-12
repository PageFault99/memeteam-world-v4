<?php
$likes = $_POST['likes'];
$data = array('likes' => $likes);
file_put_contents('likes.json', json_encode($data));
?>
?>