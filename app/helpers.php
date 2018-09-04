<?php

function httpRequest($url, $post_data, $post = true) {
    is_array($post_data) && $post_data = http_build_query($post_data);
    if (!($curl = curl_init()))
        return false;
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POST, $post);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
    $result = curl_exec($curl);
    curl_close($curl);
    return $result;
}
