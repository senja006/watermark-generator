<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Make Ups</title>
    <meta name="viewport" content="width=device-width">
    <style>
        body {
            background: #F4F8FA;
        }
        
        .makeups_list {
            border-left: 3px solid #BCE8F1;
            margin: 50px;
            display: inline-block;
            list-style: none;
        }

        .makeups_list_counter {
            display: inline-block;
            font-size: 14px;
            color: #333333;
        }

        .makeups_list li {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            line-height: 21px;
        }

        .makeups_list a {
            color: #34789A;
            font-size: 18px;
            text-decoration: none;
            display: inline-block;
            transition: .3s;
        }

        .makeups_list a:hover {
            color: #563D7C;
            padding-left: 20px;
        }
    </style>
</head>
<body>
	<ul class="makeups_list">
		<?php

		$dirFiles = scandir('./html/');

		$makeups = array();

		foreach($dirFiles as $file) {
			if(strpos($file,'.html')) {
				$makeups[] = $file;
			}
		}

		$titles = array();
		foreach($makeups as $i => $file) {
			$content = file_get_contents('./html/'.$file);
			preg_match('#<title>(.*)<\/title>#u', $content, $result);
			$titles[$i] = $result[1];
		}

		?>

		<? foreach ($makeups as $i => $file): ?>
			<li>
				<a href="<?= $_SERVER['REQUEST_URI'] ?>html/<?= $file ?>" target="_blank">
					<span class="makeups_list_counter"><?= $i + 1 ?>. </span>
<!--					--><?//= $makeups[$i] ?>
					<?= $titles[$i] ?>
				</a>
			</li>
		<? endforeach; ?>
	</ul>
</body>
</html>

