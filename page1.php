<?php
 // header('Content-Type: application/json');

   $file = file_get_contents('http://127.0.0.1:8081/api/v1/users');

// echo $file;
	$json = json_decode($file);



?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="css/less.css">
	<title>Blog_test</title>
</head>


<body>

<div class="container">

	<?php
	foreach ($json->response as $value) {
// echo $value->id;
// echo $res;
		?>

		<div class="card">

		<div class="box">
			<div class="head">
        <div class="span"><?php echo "id :". $value->id; ?> </div>

			</div>
      <div class="head">
        <div class="span"><?php echo $value->Time; ?> </div>

			</div>
      <div class="head">
        <div class="span"><?php echo $value->Record_date; ?> </div>

			</div>
      <div class="head">
        <div class="span"><?php echo $value->Amount; ?> </div>

			</div>


		</div>
	</div>



	<?php } ?>



</div>
</body>
</html>
