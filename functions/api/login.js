2026-11-06T16:38:26.4396Z	
2026-11-06T16:38:26.439661Z	    ../../../buildhome/repo/functions/api/login.js:21:0:
2026-11-06T16:38:26.439715Z	      21 │ return Response.json({
2026-11-06T16:38:26.439757Z	         ╵ ~~
2026-11-06T16:38:26.439799Z	
2026-11-06T16:38:26.440017Z	  This file is considered to be an ECMAScript module because of the top-level "await" keyword here:
2026-11-06T16:38:26.440198Z	
2026-11-06T16:38:26.440292Z	    ../../../buildhome/repo/functions/api/login.js:8:13:
2026-11-06T16:38:26.44034Z	      8 │ const user = await env.DB.prepare(
2026-11-06T16:38:26.440397Z	        ╵              ~
2026-11-06T16:38:26.440449Z	
2026-11-06T16:38:26.440651Z	
2026-11-06T16:38:26.441157Z	[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mBuild failed with 3 errors:[0m
2026-11-06T16:38:26.442234Z	
2026-11-06T16:38:26.442474Z	  ../../../buildhome/repo/functions/api/login.js:2:2: ERROR: Top-level return cannot be used inside an ECMAScript module
2026-11-06T16:38:26.442531Z	  ../../../buildhome/repo/functions/api/login.js:15:2: ERROR: Top-level return cannot be used inside an ECMAScript module
2026-11-06T16:38:26.44284Z	  ../../../buildhome/repo/functions/api/login.js:21:0: ERROR: Top-level return cannot be used inside an ECMAScript module
2026-11-06T16:38:26.443214Z	
2026-11-06T16:38:26.443409Z	
2026-11-06T16:38:26.491969Z	🪵  Logs were written to "/root/.config/.wrangler/logs/wrangler-2026-11-06_16-38-26_114.log"
2026-11-06T16:38:26.641624Z	Failed building Pages Functions.
2026-11-06T16:38:27.679543Z	Failed: generating Pages Functions failed. Check the logs above for more information. If this continues for an unknown reason, contact support: https://cfl.re/3WgEyrH
