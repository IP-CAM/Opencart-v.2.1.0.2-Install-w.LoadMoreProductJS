<?php

setlocale(LC_ALL, 'rus_RUS');

function calculateDays($startDate, $trainingCount, $schedule) {

//    $startDate = ( strftime("%w", strtotime($startDate)) == 0 ) ? 7 : strftime("%w", strtotime($startDate));
    $start = strtotime($startDate);

    $finish = strtotime('2019-12-31');

    $arrayOfDates = array();
    for ($i = $start; $i < $finish; $i += 86400) {
        list($year, $month, $day) = explode("|", date("Y|m|N", $i));
        $arrayOfDates[$year][$month][date('d', $i)] = $day;
    }
    echo '<pre>';
//    var_dump($arrayOfDates);
    if (is_array($schedule)) {
        $sum = array();
        $flag = true;
        for ($i = 0; $i < $trainingCount; $i++) {
            for($j=0;$j<count($schedule);$j++) {
                foreach ($arrayOfDates as $key => $value) {
                    foreach ($value as $mont => $day)
                        foreach ($day as $key2 => $day2) {
                            if ($day2 == '0'.$schedule[$j]){
                                $sum[] = $key2;
                                break;
                            }
                        }
                }
            }
            
        }
    }
    var_dump($sum);
}

calculateDays('2016-04-16', 6, [2, 4, 6]);


echo '<pre>';
