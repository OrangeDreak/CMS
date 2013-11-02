function cmsCommentFetchProcess(data) {
    // do something with the data
    console.log(xhr.responseJSON);
    cmsCommentLock = false;
    cmsCommentFetch();
}

function cmsCommentFetchWork() {
$.ajax({
        url: $("#comments").data('url'),
        type: "GET",
        dataType: "json",
        timeout: 5000,
        success: function(data, status, xhr) {
            if (!xhr.responseJSON) {
                cmsCommentLock = false;
                cmsCommentFetch();
                return;
            }
            cmsCommentFetchProcess(xhr.responseJSON);
        },
        error: function(xhr, status, error) {
            cmsCommentLock = false;
            cmsCommentFetch();
        }
    });
}

function cmsCommentFetchWait() {
    var cmsCommentFetchCheck = setInterval(function() {
        if (cmsCommentLock == false) {
            clearInterval(cmsCommentFetchCheck);
            cmsCommentLock = true;
            cmsCommentFetchWork()
        }
    }, 10);
    return false;
}

function cmsCommentFetch() {
    setTimeout(function() {
        cmsCommentFetchWait()
    }, 5000);
}
