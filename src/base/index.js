/**
 * Created by Lorne on 2017/5/29.
 */
import toast  from "./toast/toast.js"
import {$alert,$confirm}  from "./msgbox/msgbox.js"
import * as $loads  from "./ajax-load/index.js"
window.$alert=$alert;
window.$confirm=$confirm;
window.toast=toast;
window.$load=$loads;

