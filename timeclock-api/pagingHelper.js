
function createPagingData(pageNum, pageSize) {
    return {
        pageNumber: pageNum,
        pageSize: pageSize
    };
}

function createPagedData(pagingData, entityData) {
    return {
        paging: pagingData,
        data: entityData
    };
}