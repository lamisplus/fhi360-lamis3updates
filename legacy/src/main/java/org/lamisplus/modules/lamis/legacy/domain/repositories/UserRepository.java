package org.lamisplus.modules.lamis.legacy.domain.repositories;

import org.lamisplus.modules.lamis.legacy.domain.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository("userRepository1")
public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByLogin(String login);
}
