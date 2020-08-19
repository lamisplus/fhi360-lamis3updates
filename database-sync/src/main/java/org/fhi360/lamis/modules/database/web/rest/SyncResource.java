package org.fhi360.lamis.modules.database.web.rest;

import lombok.RequiredArgsConstructor;
import org.fhi360.lamis.modules.database.service.SyncService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sync")
public class SyncResource {
    private final SyncService syncService;

    @GetMapping("/running")
    public Boolean syncing() {
        return syncService.syncOngoing();
    }

    @GetMapping("/run")
    public void run() {
        syncService.sync();
    }

    @GetMapping("/status")
    public List<String> status() {
        return syncService.syncedTables();
    }

    @GetMapping("/last-heartbeat")
    public LocalDateTime lastHeartbeat() {
        return syncService.lastHeartbeat();
    }

    @GetMapping("/last-sync")
    public LocalDateTime lastSuccessfulSync() {
        return syncService.lastSuccessfulSync();
    }

    @GetMapping("/cleanup-database")
    public void cleanupDatabase(@RequestParam List<Long> ids) {
        syncService.cleanupDatabase(ids);
    }
}
